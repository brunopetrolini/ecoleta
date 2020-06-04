import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
  async create(request: Request, response: Response) {
    const {
      name,
      mail,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = request.body;

    const trx = await knex.transaction();
    const point = {
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
      name,
      mail,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    };

    const insertedIds = await trx('points').insert(point);

    const point_id = insertedIds[0];

    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id
      };
    });

    await trx('points_items').insert(pointItems);

    await trx.commit();

    return response.json({
      id: point_id,
      ...point
    });
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex('points').where('id', id).first();

    if (!point)
      return response.status(404).json({ message: 'Point not found.' });

    const items = await knex('items')
      .join('points_items', 'items.id', '=', 'points_items.item_id')
      .where('points_items.point_id', id);

    return response.json({ point, items });
  }

  async index(request: Request, response: Response) {
    // Filtro: cidade, uf, items (Query Params)
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const filteredPoints = await knex('points')
      .join('points_items', 'points.id', '=', 'points_items.point_id')
      .whereIn('points_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    if (!filteredPoints)
      return response.status(404).json({ message: 'No points found.' });

    return response.json(filteredPoints);
  }
}

export default PointsController;