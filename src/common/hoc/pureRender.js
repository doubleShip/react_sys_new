/**
 * Created by soga on 2017/6/19.
 */

function shallowEqual(objA, objB) {
    if (objA === objB) {
        return true;
    }

    if (typeof objA !== 'object' || objA === null ||
        typeof objB !== 'object' || objB === null) {
        return false;
    }

    let keysA = Object.keys(objA);
    let keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    let bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
    for (let i = 0; i < keysA.length; i++) {
        //if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
        if ((!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) && keysA[i] !== 'match') { //排除match字段
            //console.log("===========>>>>>>>>>>")
            //console.log(!bHasOwnProperty(keysA[i]))
            //console.log(keysA[i])
            //console.log(objA[keysA[i]])
            //console.log(objB[keysA[i]])
            //console.log(bHasOwnProperty)
            return false;
        }
    }

    return true;
}

function shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
}

function getComponentName(component) {
    var constructor = component.prototype && component.prototype.constructor;

    return (
        component.displayName
        || (constructor && constructor.displayName)
        || component.name
        || (constructor && constructor.name)
        || 'a component'
    );
}


function pureRenderDecorator(component) {
    if (component.prototype.shouldComponentUpdate !== undefined) {
        console.log(getComponentName(component) + '-----pureRenderDecorator')
    }
    component.prototype.shouldComponentUpdate = shouldComponentUpdate;
    return component;
}


module.exports = pureRenderDecorator;