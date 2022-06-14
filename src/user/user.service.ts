import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
constructor( 
  @InjectRepository(User)
  private readonly userRepository: Repository<User> 
  ){}

  async create(data: CreateUserDto) {
    const user = this.userRepository.create(data);
    const userSaved = await this.userRepository.save(user);

    if (!userSaved) {
      throw new InternalServerErrorException('Problema ao criar um usuário');
    }

    return userSaved;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.findOne(id);
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.findOne(id);

    await this.userRepository.update(user, { ...data });
    const userUpdated = this.userRepository.create({ ...user, ...data });

    return userUpdated;
  }

  async remove(id: string) {    
    const user = await this.findOne(id);
    return (await this.userRepository.remove(user)) ? true : false;
  }
}
