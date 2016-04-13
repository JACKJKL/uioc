/**
 * @file IoC.js IoC 容器类
 * @author exodia (d_xinxin@163.com)
 */

import Injector from './Injector';
import u from './util';
import Ref from './operator/Ref';
import Import from './operator/Import';
import Setter from './operator/Setter';
import List from './operator/List';
import Map from './operator/Map';
import Loader from './Loader';

export default class IoC {
    constructor(config = {}) {
        this.loader = new Loader(this);
        config.loader && this.setLoaderFunction(config.loader);
        this.components = {};
        this.operators = {
            opImport: new Import(this),
            ref: new Ref(this),
            setter: new Setter(this),
            list: new List(this),
            map: new Map(this)
        };
        this.injector = new Injector(this);

        this.addComponent(List.LIST_COMPONENT_ID, List.LIST_COMPONENT_CONFIG);
        this.addComponent(Map.MAP_COMPONENT_ID, Map.MAP_COMPONENT_CONFIG);

        this.addComponent(config.components || {});
    }

    addComponent(id, config) {
        if (typeof id === 'string') {
            let conf = {};
            conf[id] = config;
            this.addComponent(conf);
        }
        else {
            for (let k in id) {
                if (this.hasComponent(k)) {
                    u.warn(`${k} has been add! This will be no effect`);
                    continue;
                }
                this.components[k] = createComponent.call(this, k, id[k]);
            }
        }
    }

    getComponent(ids) {
        let isSingle = true;
        if (ids instanceof Array) {
            isSingle = false;
        }
        ids = [].concat(ids);
        let moduleMap = {};

        for (let i = 0, len = ids.length; i < len; ++i) {
            let id = ids[i];
            if (!this.hasComponent(id)) {
                u.warn('`%s` has not been added to the Ioc', id);
            }
            else {
                let config = this.getComponentConfig(id);
                this.processStaticConfig(id);
                try {
                    moduleMap = this.loader.resolveDependentModules(config, moduleMap, config.argDeps);
                }
                catch (e) {
                    return Promise.reject(e);
                }
            }
        }

        return this.loader.loadModuleMap(moduleMap)
            .then(() => this::createInstances(ids))
            .then(instances => isSingle ? instances[0] : instances);
    }

    hasComponent(id) {
        return !!this.components[id];
    }

    getComponentConfig(id) {
        return id ? this.components[id] : this.components;
    }

    processStaticConfig(id) {
        let config = this.getComponentConfig(id);
        this.operators.list.process(config);
        this.operators.map.process(config);
        this.operators.opImport.process(config);
        this.operators.ref.process(config);
    }

    setLoaderFunction(amdLoader) {
        this.loader.setLoaderFunction(amdLoader);
    }

    dispose() {
        this.injector.dispose();
        this.components = null;
    }
}

function createComponent(id, config) {
    let component = {
        id,
        args: config.args || [],
        properties: config.properties || {},
        anonyDeps: null,
        argDeps: null,
        propDeps: null,
        setterDeps: null,
        scope: config.scope || 'transient',
        creator: config.creator || null,
        module: config.module || undefined,
        isFactory: !!config.isFactory,
        auto: !!config.auto,
        instance: null
    };

    // creator为函数，那么先包装下
    typeof component.creator === 'function' && this.loader.wrapCreator(component);

    return component;
}

function createInstances(ids) {
    let injector = this.injector;
    let loader = this.loader;
    let setter = this.operators.setter;
    let moduleMap = {};

    function task(config, instance) {
        if (config) {
            // 获取 setter 依赖
            setter.resolveDependencies(config, instance);
            try {
                moduleMap = loader.resolveDependentModules(config, {}, config.propDeps.concat(config.setterDeps));
            }
            catch (e) {
                return Promise.reject(e);
            }

            return injector.injectDependencies(instance, config).then(() => instance);
        }
        else {
            return Promise.resolve(instance);
        }
    }

    return Promise.all(
        ids.map(
            id => {
                let component = this.hasComponent(id) ? this.getComponentConfig(id) : null;
                return injector.createInstance(component).then(task.bind(null, component));
            }
        )
    );
}
