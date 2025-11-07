import prisma from '../prismaClient.js';

export const getAssets = async (req, res) => {
  try {
    const assets = await prisma.asset.findMany({ orderBy: { updatedAt: 'desc' } });
    res.json(assets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch assets' });
  }
};

export const getAssetById = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const asset = await prisma.asset.findUnique({ where: { id } });
    if (!asset) return res.status(404).json({ error: 'Asset not found' });
    res.json(asset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch asset' });
  }
};

export const createAsset = async (req, res) => {
  const data = req.body;
  const userId = req.user?.userId;
  try {
    if (!data.name || !data.category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const created = await prisma.asset.create({
      data: {
        name: data.name,
        manufacturer: data.manufacturer || null,
        model: data.model || null,
        category: data.category,
        acquisitionDate: data.acquisitionDate ? new Date(data.acquisitionDate) : null,
        price: data.price ? Number(data.price) : 0,
        quantity: data.quantity ? Number(data.quantity) : 1,
        imageUrl: data.imageUrl || null,
        status: data.status || 'in use',
        custody: data.custody || null,
        custodyNote: data.custodyNote || null,
        location: data.location || null,
        createdById: userId || null
      }
    });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create asset' });
  }
};

export const updateAsset = async (req, res) => {
  const id = Number(req.params.id);
  const data = req.body;
  try {
    const updated = await prisma.asset.update({
      where: { id },
      data: {
        name: data.name,
        manufacturer: data.manufacturer,
        model: data.model,
        category: data.category,
        acquisitionDate: data.acquisitionDate ? new Date(data.acquisitionDate) : null,
        price: data.price ? Number(data.price) : 0,
        quantity: data.quantity ? Number(data.quantity) : 1,
        imageUrl: data.imageUrl || null,
        status: data.status,
        custody: data.custody,
        custodyNote: data.custodyNote,
        location: data.location
      }
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update asset' });
  }
};

export const deleteAsset = async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.asset.delete({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete asset' });
  }
};
