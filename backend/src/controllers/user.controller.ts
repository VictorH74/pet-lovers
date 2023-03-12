import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { SECRET } from '../server';
import { UserService } from '../services/user.service';
import { formatUser } from '../utils/helpers';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export class UserController {
  public static async getUserToken(req: Request, res: Response): Promise<any> {
    try {
      const userData: Pick<User, "email" | "password"> = req.body;
      const user = await UserService.getUserToken(userData);

      if (!user) throw new Error("Invalid email");

      const isPasswordCorrect = await bcrypt.compare(userData.password, user.password);

      if (!isPasswordCorrect) throw new Error("Invalid password");

      const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "1h" });

      return res.send({ token });
      
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({error: error.message});
        return;
      }
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

  public static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData: User = req.body;
      const user = await UserService.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

  public static async listUsers(req: Request, res: Response): Promise<void> { ////
    try {
      const users = await UserService.listUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

  public static async retrieveUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const user = await UserService.retrieveUser(userId);

      if (!user) throw new Error("User not found")

      res.status(200).json(formatUser(user));
    } catch (error) {
      if (error instanceof Error) {
        res.send({ error: error.message })
        return
      }
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

  public static async updateUser(req: Request, res: Response): Promise<void> { /////
    try {
      const userId = req.params.id;
      const userData = req.body;
      const user = await UserService.updateUser(userId, userData);
      res.status(200).json(formatUser(user));
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

  public static async deleteUser(req: Request, res: Response): Promise<void> { /////
    try {
      const userId = req.params.id;
      await UserService.deleteUser(userId);
      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }
}
