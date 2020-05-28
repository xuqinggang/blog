const mixin = (obj) => {
  return (target) => {
    Object.assign(target.prototype, {
      ...obj
    })
  }
}
export interface PageInterface<Data> {
  data: Data;
  onLoad?: () => void;
}

export class Page<TypeProps=any, TypeData=any>
 implements PageInterface<TypeData> { //class  implements 
  props: TypeProps;
  data: TypeData; 
  static Conf(config: any) {
    return (target: { new (arg: any): Page }) => {}
  }
  setData: (data: {[key in keyof TypeData]: TypeData[key]}) => void;
}


interface IProps {
  onChange: () => void;
}

interface IState {
  name: string;
}

@connect()
class WelcomePage extends Page<IProps, IState> {
  onLoad() {
    console.log('loading-------')
  }
}
const a = new WelcomePage();


// const connect = (mapStateToData, mapDispatchToProps) => {
//   return <T  PageConstructor<T>>(target) => {
//     const oldOnload = target.prototype.onLoad;
//     Object.defineProperty(target.prototype, 'onLoad', {
//       value: function () {
//         oldOnload.apply(this, arguments);
//         console.log('loading---------');
//       }
//     })
//   }
// }


const mapStateToData = () => ({
  name: 'shao'
})
const mapDispatchToProps = () => {

}

const obj = {
  init: () => {
    console.log('init');
  }
}

// @mixin(obj)
// @connect(mapStateToData, mapDispatchToProps)
// class Page {
//   onLoad() {
//     console.log('loading')
//   }
// }

// const p = new Page();
// p.onLoad();
// p.init();