module.exports = {
    //插入数据
    INNER_MEMEBER: 'insert into userlist (name,age,phone,addrss,id_card,create_time) values (?,?,?,?,?,?)',
    //查询是否有相同姓名
    SELECT_ISHAS: 'select * from userlist where id_card=?',
    //查询所有的数据
    SELECT_ALL: 'select * from userlist',
    //删除数据
    DEL_MEMEBER: 'delete from userlist where id=?',
	//查看详情
	SELECT_DETAIL:'select * from userlist where id=?',
    //修改数据
    UPDATE_INFO: 'update userlist set name=?,age=?,phone=?,address=?,id_cart=?,create_time=? where id=?'
}