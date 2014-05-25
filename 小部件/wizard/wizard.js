function step1(data_key, result_callback){

    var targets = ['女朋友','男朋友','父亲','妈妈','孩子'];

    var warpper = $('<ul></ul>')

    $.each(targets, function(k,v){

        $('<li>'+v+'</li>').click(function(){result_callback(v)}).appendTo(warpper);

    });

    return ['第一步:请选择送礼物的对象',warpper];

}

function step2(data_key, result_callback){

    var tags = {

        '女朋友':['创意','可爱','浪漫','激情','实用','数码',

                '自制','毛绒玩具','衣服','包包'],

        '男朋友':['男士用品','温馨','实用','数码','创意','衣物'],

        '父亲'  :['男士用品','健康','植物','衣物'],

        '妈妈'  :['温馨','健康','创意','护肤品','实用'],

        '孩子'  :['玩具','学习用品','实用','数码']

    };

    var warpper = $('<ul></ul>')

    $.each(tags[data_key], function(k,v){

        $('<li>'+v+'</li>').click(function(){result_callback(v)}).appendTo(warpper);

    });

    return ['第二步:请选择关键词',warpper];  

}

function step3(data_key, result_callback){

    var price_level = ['便宜','普通','稍贵','贵重'];

    var warpper = $('<ul></ul>')

    $.each(price_level, function(k,v){

        $('<li>'+v+'</li>').click(function(){result_callback(v)}).appendTo(warpper);

    });

    return ['第三步:请选择价格区间',warpper];

}
function Wizard(container, steps, callback){

    this.container = container; //向导容器

    this.steps = steps;         //向导步骤

    this.callback = callback;   //向导执行完毕执行的回调

    this.collect_data = [];     //保存向导每一步骤的结果

    this.index = 0;            //当前执行在那一步骤
    this.length = steps.length;

}

//绘制某一步骤

Wizard.prototype.render = function(step, this_result){

    var me = this;

    //执行该步骤并得到该步骤的UI

    var to_append = step(this_result,function(result){

        me.collect_data.push(result); //收集本步骤结果

        //向导执行完毕时调用回调函数，否则执行下一步

        if(me.collect_data.length == me.steps.length)

            me.callback(me.collect_data);

        else

            me.next(result);

    });

    //绘制本步骤的UI

    this.container.empty();

    this.container.append("<h2>"+to_append[0]+"</h2>");

    this.container.append(to_append[1]);

    if(this.index == 0){

        //后退按钮

        this.container.append($("<div class='bar'><a href='javascript:;'>前进</a></div>")

            .click(function(){me.next()}

                ));

    }else if (this.index>0&&this.index<this.length-1){

        this.container.append($("<div class='bar'><a href='javascript:;'>后退</a></div>")

            .click(function(){me.back()}

                ));
        this.container.append($("<div class='bar'><a href='javascript:;'>前进</a></div>")

            .click(function(){me.next()}

                ));
	}
	else if(this.index==this.length-1){

        this.container.append($("<div class='bar'><a href='javascript:;'>后退</a></div>")

            .click(function(){me.back()}

                ));
	}else{
		alert("wrong");
	}
}

//执行下一步

Wizard.prototype.next = function(this_result){

    if(this.index >= this.steps.length -1)

        return;

    var step = this.steps[++this.index];

    this.render(step,this_result);

}

//后退到上一步

Wizard.prototype.back = function(){

    if(this.index <= 0)

        return;

    var step = this.steps[--this.index];

    //步骤回到上一步，但上一步的数据需要上上一步的结果来决定

    this.collect_data = this.collect_data.slice(0, this.index);

    this.render(step, this.collect_data[this.index - 1]);

}

