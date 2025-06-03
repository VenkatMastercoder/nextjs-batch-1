-- CreateTable
CREATE TABLE "Restaurant" (
    "restaurant_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "timing" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "tags" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_restaurant_id_key" ON "Restaurant"("restaurant_id");
