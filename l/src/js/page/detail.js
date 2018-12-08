require(['../js/common.js'],function(){
	require(['mui','dom','pageParams'],function(mui,dom,pageParams){
		mui.init();	
		
		var id = pageParams.id;
		
		console.log(id);
		
		if(id){
			mui.ajax('/users/api/detail',{
				data:{
					id:id
				},
				dataType:'json',
				success:function(res){
					console.log(res)
					if(res.code===1){
						var data=res.msg[0]
						dom('.name').innerHTML=data.name;
						dom('.age').innerHTML=data.age || '无';
						dom('.phone').innerHTML=data.phone || '无';
						dom('.addrss').innerHTML=data.addrss || '无';
						dom('.id-card').innerHTML=data.id_card;
					}
				}
			})
		}
		
		dom('.edit-btn').addEventListener('tap',function(){
			location.href='../../page/add.html?id='+id;
		})
		
	})
})