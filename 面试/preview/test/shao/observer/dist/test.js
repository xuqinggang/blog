var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const mixin = (obj) => {
    return (target) => {
        Object.assign(target.prototype, Object.assign({}, obj));
    };
};
const connect = (mapStateToData, mapDispatchToProps) => {
    return (target) => {
        const oldOnload = target.prototype.onLoad;
        Object.defineProperty(target.prototype, 'onLoad', {
            value: function () {
                oldOnload.apply(this, arguments);
                console.log('loading---------');
            }
        });
    };
};
const mapStateToData = () => ({
    name: 'shao'
});
const mapDispatchToProps = () => {
};
const obj = {
    init: () => {
        console.log('init');
    }
};
let Page = class Page {
    onLoad() {
        console.log('loading');
    }
};
Page = __decorate([
    mixin(obj),
    connect(mapStateToData, mapDispatchToProps)
], Page);
const p = new Page();
p.onLoad();
p.init();
