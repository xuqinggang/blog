const connect = (mapStateToData, mapDispatchToProps) => {
  return (target) => {
    const oldOnload = target.prototype.onLoad;
    Object.defineProperty(target.prototype, 'onLoad', {
      value: function () {
        oldOnload.apply(this, arguments);
        console.log('loading---------');
      }
    })
  }
}

const mapStateToData = () => ({
  name: 'shao'
})
const mapDispatchToProps = () => {

}
@connect(mapStateToData, mapDispatchToProps)
class Page {
  onLoad() {
    console.log('loading')
  }
}

const p = new Page();
console.log(p);