import {repository} from '@loopback/repository';
import {User} from '../models';
import {UserRepository} from '../repositories';

export class UserService {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository
  ) { }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({where: {username}});
  }
}
