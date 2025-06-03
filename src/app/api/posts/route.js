const { NextResponse } = require("next/server");

export function GET(req) {
  return NextResponse.json({ message: "Hello" });
}
