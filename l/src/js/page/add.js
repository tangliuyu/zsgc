require(['../js/common.js'],function(){
	require(['mui','dom','pageParams'],function(mui,dom,pageParams){
		mui.init();	
		var id=pageParams.id || '';
		if(id){
			mui.ajax('/users/api/detail',{
				data:{
					id:id
				},
				dataType:'json',
				success:function(res){
					console.log(res)
					if(res.code===1){
						var data=res.msg[0];
						dom('.name').value=data.name;
						dom('.age').value=data.age || '';
						dom('.phone').value=data.phone || '';
						dom('.addrss').value=data.addrss || '';
						dom('.id_card').value=data.id_card;
					}
				}
			})
		}
		
		
		
		//点击确定
		dom('.cor-btn').addEventListener('tap',function(){
			var name= dom('.name').value,
				age= dom('.age').value,
				phone= dom('.phone').value,
				addrss= dom('.addrss').value,
				idCard= dom('.id_card').value;
			
			if(!name || !idCard){
				alert('姓名或身份证号为空')
			}else{
				var url=id ?'/users/api/update':'/users/api/add'
				mui.ajax('/users/api/add',{
					type:'post',
					data:{
						name:name,
						age:age,
						phone:phone,
						addrss:addrss,
						id_card:idCard,
						id:id
					},
					dataType:'json',
					success:function(res){
						console.log(res)
						if(res.code===1){
							location.href='../../index.html'
						}
					}
				})
			}
			
		})
		
	});
});