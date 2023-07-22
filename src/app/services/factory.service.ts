import { Model, Document } from "mongoose";
class ServiceFactory<T extends Document | any> {
  constructor(private Model: Model<T>) {
    this.Model = Model;
  }
  create = (data: any) => {
    return new this.Model(data).save();
  };
  getAll = (projection = "", criteria={}) => {
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
}
export default ServiceFactory;
