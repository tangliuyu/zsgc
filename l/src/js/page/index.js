require(['./js/common.js'],function(){
	require(['mui','dom'],function(mui,dom){
		mui.init();	
		mui('.mui-scroll-wrapper').scroll({
			deceleration:0.0005
		});
		mui.ajax('/users',{
			
			dataType:'json',
			success:function(res){
				console.log(res)
				if(res.code===1){
					renderList(res.msg)
					
				}
			}
		});
		//渲染
		function renderList(data){
			var str='';
			data.forEach(function(item){
				str+=
				`
					<li class="mui-table-view-cell">${item.name}
						<button type="button" class="mui-btn mui-btn-primary" data-id="${item.id}">查看详情</button>
						<button type="button" class="mui-btn mui-btn-danger" data-id="${item.id}">删除</button>
					</li>
				`
			});
			document.querySelector('.list').innerHTML=str;
		}
		//添加页面
		dom('.add-btn').addEventListener('tap',function(){
			location.href='../../page/add.html'
		});
		//查看详情
		mui('.list').on('tap','.mui-btn-primary',function(){
			
			var id =this.getAttribute('data-id');
			// console.log(id)
			
			location.href="../../page/detail.html?id="+id;
		});
		
		//删除
		mui('.list').on('tap','.mui-btn-danger',function(){
			var id = this.getAttribute('data-id');
			var that = this;
			mui.confirm('是否确定删除？','提示',['取消','确定'],function(data){
				console.log(data)
				if(data.index===1){
					mui.ajax('/users/api/del',{
							
						data:{
							id:id
						},
						dataType:'json',
						success:function(res){
							console.log(res)
							if(res.code===1){
								dom('.list').removeChild(that.parentNode)
							}
						}
					})
				}
			})
			
		});
	})
})