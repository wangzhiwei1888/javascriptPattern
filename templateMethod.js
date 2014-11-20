    
/**
 * 模板方法模式
 * Created by Administrator on 14-5-26.
 */

//模板方法（TemplateMethod）定义了一个操作中的算法的骨架，而将一些步骤延迟到子类中。
// 模板方法使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。在类库中尤为重要。



function DinkBase(){


}

DinkBase.prototype.prepare = function(){

    this.boilWater();
    this.brew();
    this.pourOnCup();
    if(this.customWantsCondiments()){

        this.addCondiments();

    }
    else{
        console.log("不加")
    }
}

DinkBase.prototype.boilWater = function(){

    console.log("将水烧开");
}

DinkBase.prototype.brew = function(){

    throw new Error('该方法必须重写');
}

DinkBase.prototype.pourOnCup = function(){

    console.log('将饮料倒入杯子');
}

DinkBase.prototype.customWantsCondiments = function(){

    return true;
}

DinkBase.prototype.addCondiments = function(){

    throw new Error('该方法必须重写');
}



function Coffee(){

    DinkBase.apply(this,arguments);

}

Coffee.prototype = new DinkBase();

//此时Tea的构造函数变了，需要重定向构造函数。指向自己。
Coffee.prototype.constructor = Coffee;


Coffee.prototype.brew = function(){

    console.log('冲咖啡');
}

Coffee.prototype.pourOnCup = function(){

    console.log('将咖啡倒入杯子');
}

Coffee.prototype.customWantsCondiments = function(){

    return confirm("相要加糖和牛奶吗？");
}

Coffee.prototype.addCondiments = function(){

    console.log("添加糖和牛奶");
}

//var co = new Coffee();

//co.prepare();



function Tea(){
    
    DinkBase.apply(this,arguments);

}

Tea.prototype = new DinkBase();

//此时Tea的构造函数变了，需要重定向构造函数。指向自己。
Tea.prototype.constructor = Tea;


Tea.prototype.brew = function(){

    console.log('沏茶');
}

Tea.prototype.pourOnCup = function(){

    console.log('将茶叶倒入杯子');
}

Tea.prototype.customWantsCondiments = function(){

    return confirm("相要加柠檬吗？");
}

Tea.prototype.addCondiments = function(){

    console.log("添加柠檬");
}

var tea = new Tea();

tea.prepare();


console.log(Tea.prototype.constructor)


/**
模板方法应用于下列情况：
1、一次性实现一个算法的不变的部分，并将可变的行为留给子类来实现
2、各子类中公共的行为应被提取出来并集中到一个公共父类中的避免代码重复，不同之处分离为新的操作，最后，用一个钓鱼这些新操作的模板方法来替换这些不同的代码
3、控制子类扩展，模板方法只在特定点调用“hook”操作，这样就允许在这些点进行扩展
   和策略模式不同，模板方法使用继承来改变算法的一部分，而策略模式使用委托来改变整个算法。
*/
