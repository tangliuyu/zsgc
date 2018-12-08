var express = require('express');
var router = express.Router();

/* GET home page. */

var query = require('../mysql/index');

 var sql=require('../mysql/sql')

router.get('/', function(req, res, next) {

    query(sql.SELECT_ALL, function(error, results) {

        if (error) {

            res.json({ code: 0, msg: error })

        } else {

            res.json({ code: 1, msg: results })

        }

    })
});

//添加用户
router.post('/api/add', function(req, res, next) {
console.log(req.body)
    var params=req.body,
		name=params.name,
		age=params.age,
		phone=params.phone,
		addrss=params.addrss,
		id_card=params.id_card,
		date= new Date();
	if(!name||!id_card){
		res.json({code:2,msg:'用户名或身份证号为空'})
	}else{
		//判断是否存在
		queryIsHas()
	}
	function queryIsHas(){
		query(sql.SELECT_ISHAS,[id_card],function(error,results){
			if(error){
				res.json({code:0,msg:error})
			}else{
				if(results.length){
					res.josn({coed:3,msg:'此用户以存在'})
				}else{
					//添加成员
					addMember();
				}
			}
		})
	};	
	function addMember(){
		query(sql.INNER_MEMEBER,[name,age,phone,addrss,id_card,date],function(error,results){
			if(error){
				res.json({code:0,msg:error})
			}else{
				res.json({code:1,msg:'添加成功'})
			}
		})
	};
	
});

//删除
router.get('/api/del', function(req, res, next) {
	
	var id=req.query.id;
	console.log(id)
	if(id){
		query(sql.DEL_MEMEBER,[id], function(error, results) {
		
		        if (error) {
		
		            res.json({ code: 0, msg: error })
		
		        } else {
		
		            res.json({ code: 1, msg: '删除成功' })
		
		        }
		
		    })
	}else{
		res.json({code:2,msg:'缺少参数'})
	}
    
});

//查看详情

router.get('/api/detail',function(req,res,next){
	var id=req.query.id;
	if(id){
		query(sql.SELECT_DETAIL,[id], function(error, results) {
		
		        if (error) {
		
		            res.json({ code: 0, msg: error })
		
		        } else {
		
		            res.json({ code: 1, msg: results})
		
		        }
		
		    })
	}else{
		res.json({code:2,msg:'缺少参数'})
	}	
})
//修改
router.post('/api/update',function(req,res,next){
	var params=req.body,
		name=params.name,
		age=params.age,
		phone=params.phone,
		addrss=params.addrss,
		id_card=params.id_card,
		date=new Date(),
		id=params.id;
		if(id){
			if(!name || !id_card){
				
				res.json({code:2,msg:'用户好身份为空'})
			}else{
				query(sql.UPDATE_INFO,[name,age,phone,addrss,id_card,date,id],function(error,results){
					if(error){
						res.json({code:0,msg:error})
					}else{
						res.json({code:1,msg:'修改成功'})
					}
				})
			}
		}else{
			res.json({code:2,msg:'缺少参数'})
		}
})
module.exports = router;