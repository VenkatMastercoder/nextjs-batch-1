import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// BASE_URL - localhost:3000/api

// GET : BASE_URL/restaurant - Fetch all the Restaurant
export async function GET(req) {
  try {
    // 1. Data From Frontend

    // 2. DB Logic
    const restaurants = await prisma.restaurant.findMany();

    // 3. Data to Frontend
    return NextResponse.json(
      {
        message: "Fetched all Data",
        data: restaurants,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST : BASE_URL/restaurant - Add Restaurant
export async function POST(req) {
  try {
    // 1. Data from Frontend
    const body = await req.json();
    const { restaurant_id, title, timing, price, rating, tags } = body;

    // 2. DB Logic
    const restaurant = await prisma.restaurant.create({
      data: {
        restaurant_id: restaurant_id,
        title: title,
        timing: timing,
        price: price,
        rating: rating,
        tags: tags,
      },
    });

    // 3. Data to Frontend
    return NextResponse.json(
      { message: "Added the New Restaurant", data: restaurant },
      { status: 200 }
    );
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}