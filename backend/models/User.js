const { db } = require('../config/db');

const User = {
  create: (userData) => {
    const stmt = db.prepare(`
      INSERT INTO users (name, email, password, profileImageUrl)
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(
      userData.name,
      userData.email,
      userData.password,
      userData.profileImageUrl || ''
    );
    return { id: result.lastInsertRowid, ...userData };
  },

  findOne: (query) => {
    if (query.email) {
      const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
      return stmt.get(query.email);
    }
    if (query.id) {
      const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
      return stmt.get(query.id);
    }
    return null;
  },

  findById: (id) => {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id);
  },

  findByIdAndUpdate: (id, updateData) => {
    const fields = [];
    const values = [];
    
    for (const [key, value] of Object.entries(updateData)) {
      if (value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }
    
    if (fields.length === 0) return null;
    
    fields.push('updatedAt = CURRENT_TIMESTAMP');
    values.push(id);
    
    const stmt = db.prepare(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);
    
    return User.findById(id);
  }
};

module.exports = User;
