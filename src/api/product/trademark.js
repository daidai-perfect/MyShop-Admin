import request from '@/utils/request'
/* 

*/
export default{
    delete(id){
        return request.delete(`/admin/product/baseTrademark/remove/${id}`)
    },
    
  // POST /admin/product/baseTrademark/save   //添加新的品牌
  // 新增BaseTrademark
  // PUT /admin/product/baseTrademark/update  //修改品牌
  // 修改BaseTrademark
  // 增加品牌和修改品牌 最终都需要传递这样一个对象 请求体参数
  // {
  //   "id": 0,   // 以后增加新的品牌是不需要id的  而修改一个品牌是需要id的
  //   "logoUrl": "string",
  //   "tmName": "string"
  // }

    addOrUpdate(trademark){
        //根据id来决定这个请求函数是添加还是修改
        if(trademark.id){
            return request.put('/admin/product/baseTrademark/update',trademark)
        }else{
            return request.post('/admin/product/baseTrademark/save',trademark)
        }
    },

     // GET /admin/product/baseTrademark/{page}/{limit} //获取品牌的分页列表 查
    // 分页列表
    getPageList(page,limit){
        return request.get(`/admin/product/baseTrademark/${page}/${limit}`)
    }
}