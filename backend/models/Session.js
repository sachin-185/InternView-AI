const { db } = require('../config/db');

const Session = {
  create: (sessionData) => {
    const stmt = db.prepare(`
      INSERT INTO sessions (user_id, role, experience, topicsToFocus, description)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      sessionData.user,
      sessionData.role,
      sessionData.experience,
      sessionData.topicsToFocus,
      sessionData.description || ''
    );
    return { id: result.lastInsertRowid, ...sessionData };
  },

  find: (query = {}) => {
    let sql = 'SELECT * FROM sessions';
    const params = [];
    const conditions = [];

    if (query.user) {
      conditions.push('user_id = ?');
      params.push(query.user);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY createdAt DESC';

    const stmt = db.prepare(sql);
    return stmt.all(...params);
  },

  findById: (id) => {
    const stmt = db.prepare('SELECT * FROM sessions WHERE id = ?');
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
    
    const stmt = db.prepare(`UPDATE sessions SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);
    
    return Session.findById(id);
  },

  deleteOne: (id) => {
    const stmt = db.prepare('DELETE FROM sessions WHERE id = ?');
    return stmt.run(id);
  },

  deleteMany: (query) => {
    let sql = 'DELETE FROM sessions';
    const params = [];
    
    if (query.user_id) {
      sql += ' WHERE user_id = ?';
      params.push(query.user_id);
    }
    
    const stmt = db.prepare(sql);
    return stmt.run(...params);
  }
};

module.exports = Session;
