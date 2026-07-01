     1|-- Migration: 0000_create_rewards_tables.sql
     2|-- Created: 2026-06-30T15:50:48.128Z
     3|-- Description: create_rewards_tables
     4|
     5|-- Create users table for tracking user progress
     6|CREATE TABLE IF NOT EXISTS users (
     7|  id TEXT PRIMARY KEY,
     8|  wallet_address TEXT UNIQUE NOT NULL,
     9|  level INTEGER DEFAULT 1,
    10|  xp INTEGER DEFAULT 0,
    11|  total_xp INTEGER DEFAULT 0,
    12|  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    13|  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    14|);
    15|
    16|-- Create badges table for badge definitions
    17|CREATE TABLE IF NOT EXISTS badges (
    18|  id TEXT PRIMARY KEY,
    19|  name TEXT NOT NULL,
    20|  description TEXT,
    21|  icon TEXT,
    22|  rarity TEXT DEFAULT 'common',
    23|  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    24|);
    25|
    26|-- Create user_badges table for tracking owned badges
    27|CREATE TABLE IF NOT EXISTS user_badges (
    28|  id TEXT PRIMARY KEY,
    29|  user_id TEXT NOT NULL,
    30|  badge_id TEXT NOT NULL,
    31|  earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    32|  FOREIGN KEY (user_id) REFERENCES users(id),
    33|  FOREIGN KEY (badge_id) REFERENCES badges(id),
    34|  UNIQUE(user_id, badge_id)
    35|);
    36|
    37|-- Create activity_log table for tracking user actions
    38|CREATE TABLE IF NOT EXISTS activity_log (
    39|  id TEXT PRIMARY KEY,
    40|  user_id TEXT NOT NULL,
    41|  action_type TEXT NOT NULL,
    42|  xp_earned INTEGER DEFAULT 0,
    43|  description TEXT,
    44|  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    45|  FOREIGN KEY (user_id) REFERENCES users(id)
    46|);
    47|
    48|-- Create milestones table for progression milestones
    49|CREATE TABLE IF NOT EXISTS milestones (
    50|  id TEXT PRIMARY KEY,
    51|  name TEXT NOT NULL,
    52|  description TEXT,
    53|  xp_threshold INTEGER NOT NULL,
    54|  badge_id TEXT,
    55|  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    56|  FOREIGN KEY (badge_id) REFERENCES badges(id)
    57|);
    58|
    59|-- Create user_milestones table for tracking completed milestones
    60|CREATE TABLE IF NOT EXISTS user_milestones (
    61|  id TEXT PRIMARY KEY,
    62|  user_id TEXT NOT NULL,
    63|  milestone_id TEXT NOT NULL,
    64|  completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    65|  FOREIGN KEY (user_id) REFERENCES users(id),
    66|  FOREIGN KEY (milestone_id) REFERENCES milestones(id),
    67|  UNIQUE(user_id, milestone_id)
    68|);
    69|
    70|-- Insert default badges
    71|INSERT OR IGNORE INTO badges (id, name, description, icon, rarity) VALUES
    72|  ('badge_first_mint', 'First Mint', 'Minted your first collectible', '🎨', 'common'),
    73|  ('badge_prediction_master', 'Prediction Master', 'Made 10 successful predictions', '🔮', 'rare'),
    74|  ('badge_collector', 'Collector', 'Owned 5 unique collectibles', '💎', 'rare'),
    75|  ('badge_oracle_sage', 'Oracle Sage', 'Reached level 10', '🧙', 'epic'),
    76|  ('badge_early_adopter', 'Early Adopter', 'Joined in the first week', '⭐', 'legendary');
    77|
    78|-- Insert default milestones
    79|INSERT OR IGNORE INTO milestones (id, name, description, xp_threshold, badge_id) VALUES
    80|  ('milestone_level_5', 'Level 5 Reached', 'Reach level 5', 500, NULL),
    81|  ('milestone_level_10', 'Level 10 Reached', 'Reach level 10', 1000, 'badge_oracle_sage'),
    82|  ('milestone_100_xp', '100 XP Milestone', 'Earn 100 XP', 100, NULL),
    83|  ('milestone_500_xp', '500 XP Milestone', 'Earn 500 XP', 500, NULL);
    84|