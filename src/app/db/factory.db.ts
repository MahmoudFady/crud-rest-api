import { Model, Document, FilterQuery, UpdateQuery } from "mongoose";

class BaseRepository<T extends Document | any> {
  constructor(private model: Model<T>) {}

  create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  findAll(criteria: FilterQuery<T> = {}): Promise<T[]> {
    return this.model.find(criteria);
  }

  findOne(criteria: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(criteria);
  }

  findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  updateOne(id: string, data: UpdateQuery<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  deleteOne(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id);
  }
}

export default BaseRepository;
