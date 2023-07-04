import { Model, Document, FilterQuery, UpdateQuery } from "mongoose";

class BaseRepository<T extends Document | any> {
  constructor(private model: Model<T>) {}

  create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  findAll(criteria: FilterQuery<T> = {}): Promise<T[]> {
    return this.model.find(criteria).exec();
  }

  findOne(criteria: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(criteria).exec();
  }

  findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  updateOne(id: string, data: UpdateQuery<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  deleteOne(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}

export default BaseRepository;
