var http=require("https")
var url="https://www.imooc.com/"
var cheerio=require("cheerio")

http.get(url,function(res){
	var html='';
	res.on('data',function(data){
		html+=data
	})
	res.on('end',function(){
		var courseData = filertHtml(html);
	    printInfo(courseData);
	})
}).on('error',function(){
	console.log("error!!")
})

function filertHtml(html){
	  var $=cheerio.load(html);
	  var contentClasses=$(".course-card-content");
	 
	  
      var courseData=[];
      
      contentClasses.each(function(item){
      	
      	var contentClass=$(this);
      	
      	
      	var title=contentClass.find(".course-card-name").text();
      	var price=contentClass.find(".course-card-price").text();
        var thisCourseData={
        	title:title,
        	price:price
        }
        courseData.push(thisCourseData);
        
      })     
      return courseData;
}

function printInfo(courseData){
	for(var i=0;i<courseData.length;i++){
		console.log(i+1+".《"+courseData[i].title+"》\n"+"价格:"+courseData[i].price);
	}
}
