import { Request, Response } from "express";
import { pool } from "../../dbConfig";

export const chatController = {
  getChatsBetweenUsers: async (req: Request, res: Response) => {
    try {
      console.log("Here is the params---------", req.params);
      const user = req.user as { user_id?: string };
      const user_id_1 = user?.user_id || "null";
      const { user_id_2 } = req.params;

      // Retrieve chat messages from the database based on user IDs
      const result = await pool.query(
        "SELECT * FROM chat WHERE (user_id_sender = $1 AND user_id_receiver = $2) OR (user_id_sender = $2 AND user_id_receiver = $1) ORDER BY timestamp",
        [user_id_1, user_id_2]
      );

      // Send the retrieved chats as a JSON response
      res.json(result.rows);
    } catch (error) {
      console.error("Error fetching chats:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  getConnectedUserConnections: async (req: Request, res: Response) => {
    try {
      const user = req.user as { user_id?: string };
      const user_id = user?.user_id || "null";
      // Retrieve user connections with connection_status = 'connected' where the authenticated user is involved
      const result = await pool.query(
        `SELECT * FROM user_connections WHERE (user_id_1 = $1 OR user_id_2 = $1) AND (connection_status='accepted')`,
        [user_id]
      );

      // Send the retrieved connected users as a JSON response
      res.json(result.rows);
    } catch (error) {
      console.error("Error fetching connected user IDs:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};
