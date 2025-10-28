import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { EntryType } from "@prisma/client";

export const createEntry = async (req: Request, res: Response) => {
  try {
    const { title, type, director, budget, location, duration, year } =
      req.body;

    const existingEntry = await prisma.entry.findFirst({
      where: {
        title: title,
        year: year,
      },
    });

    if (existingEntry) {
      return res.status(409).json({
        error: "An entry with this title and year already exists.",
      });
    }

    const newEntry = await prisma.entry.create({
      data: {
        type,
        title,
        director,
        budget,
        location,
        duration,
        year,
      },
    });
    res.status(201).json(newEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create entry" });
  }
};

// 2. READ (ALL)
export const getAllEntries = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const entries = await prisma.entry.findMany({
      skip: skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });
    const totalEntries = await prisma.entry.count();

    res.status(200).json({
      data: entries,
      meta: {
        total: totalEntries,
        page,
        limit,
        totalPages: Math.ceil(totalEntries / limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch entries" });
  }
};

// 3. UPDATE
export const updateEntry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, type, director, budget, location, duration, year } =
      req.body;

    // Optional: Validate type if it's being updated
    if (type && !Object.values(EntryType).includes(type)) {
      return res
        .status(400)
        .json({ error: "A valid type (MOVIE or TV_SHOW) is required" });
    }

    const updatedEntry = await prisma.entry.update({
      where: { id: parseInt(id) },
      data: {
        type, // Add type to update data
        title,
        director,
        budget,
        location,
        duration,
        year: year ? parseInt(year) : undefined,
      },
    });
    res.status(200).json(updatedEntry);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Entry not found or failed to update" });
  }
};

// 4. DELETE
export const deleteEntry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.entry.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Entry not found" });
  }
};

//5 - GET ENTRY STATS
export const getEntryStats = async (req: Request, res: Response) => {
  try {
    // Run all count queries in parallel
    const [totalEntries, totalMovies, totalTvShows] = await Promise.all([
      prisma.entry.count(),
      prisma.entry.count({ where: { type: EntryType.MOVIE } }),
      prisma.entry.count({ where: { type: EntryType.TV_SHOW } }),
    ]);

    res.status(200).json({
      totalEntries,
      totalMovies,
      totalTvShows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch entry statistics" });
  }
};
