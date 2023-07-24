import { Model, Document, QueryOptions } from "mongoose";
class ServiceFactory<T extends Document | any> {
  constructor(private Model: Model<T>) {
    this.Model = Model;
  }
  create = (data: any) => {
    return new this.Model(data).save();
  };
  getAll = (projection = "", criteria = {}) => {
    return this.Model.find(criteria).select(projection);
  };
  getById = (id: string) => {
    return this.Model.findById(id);
  };
  updateById = (id: string, data: any) => {
    return this.Model.findByIdAndUpdate(id, data, { new: true });
  };
  deleteById = (id: string) => {
    return this.Model.findByIdAndDelete(id).select("_id");
  };
  findByPagination = async (
    query: { [k: string]: any },
    projection = "",
    criteria = {}
  ) => {
    /**
     * p => page index
     * s => limit
     * total => total documents in db
     */
    const { p = 1, s = 2 } = query;
    const total = await this.Model.countDocuments();
    const pagesCount = Math.ceil(total / s);
    const data = await this.Model.find(criteria)
      .skip(s * (p - 1))
      .limit(s)
      .select(projection);
    return { pagesCount, data, p, s, total };
  };
  
}
export default ServiceFactory;
