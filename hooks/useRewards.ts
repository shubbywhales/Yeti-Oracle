     1|'use client';
     2|
     3|export interface Badge {
     4|  id: string;
     5|  name: string;
     6|  description?: string;
     7|  icon?: string;
     8|  rarity?: string;
     9|}
    10|
    11|export interface UserRewards {
    12|  id: string;
    13|  wallet_address: string;
    14|  level: number;
    15|  xp: number;
    16|  total_xp: number;
    17|  badges: Badge[];
    18|  milestones: any[];
    19|}
    20|