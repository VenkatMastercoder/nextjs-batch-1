import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// BASE_URL - localhost:3000/api

// PUT : Update Restaurant
export async function PUT(req, { params }) {
  try {
    const restaurant_id = params.restaurant_id;
    const body = await req.json();
    
    // Update the restaurant
    const restaurant = await prisma.restaurant.update({
      where: {
        restaurant_id: restaurant_id
      },
      data: {
        title: body.title,
        timing: body.timing,
        price: body.price,
        rating: body.rating,
        tags: body.tags,
      },
    });

    return NextResponse.json(
      { message: "Updated the Restaurant", data: restaurant },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE : Delete Restaurant
export async function DELETE(req, { params }) {
  try {
    const restaurant_id = params.restaurant_id;

    await prisma.restaurant.delete({
      where: {
        restaurant_id: restaurant_id
      },
    });

    return NextResponse.json(
      { message: "Restaurant deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
