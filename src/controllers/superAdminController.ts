import { Request, Response } from 'express';
import { User } from '../models/User';

const deleteUserBySuperAdmin = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const userToDelete = await User.findOneBy({ id: parseInt(userId) });

        if (!userToDelete) {
            return res.status(404).json({
                success: false,
                message: `User ID ${userId} not found`
            });
        }

        const userRemoved = await User.remove(userToDelete as User);
        return res.status(200).json({
            success: true,
            message: `User ID ${userId} has been deleted`,
            data: userRemoved
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User cannot be deleted',
            error: error
        });
    }
};






export { deleteUserBySuperAdmin };


