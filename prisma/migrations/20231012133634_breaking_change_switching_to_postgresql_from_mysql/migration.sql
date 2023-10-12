-- CreateTable
CREATE TABLE "Captain" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "joining_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Captain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaptainAttributes" (
    "id" SERIAL NOT NULL,
    "captain_id" INTEGER NOT NULL,
    "vehicle_type" TEXT NOT NULL,
    "vehicle_model" TEXT NOT NULL,
    "vehicle_color" TEXT NOT NULL,
    "vehicle_plate_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CaptainAttributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaptainStatistic" (
    "id" SERIAL NOT NULL,
    "captain_id" INTEGER NOT NULL,
    "total_distance_traveled" DOUBLE PRECISION NOT NULL,
    "total_orders_delivered" INTEGER NOT NULL,
    "total_orders_canceled" INTEGER NOT NULL,
    "total_orders_rejected" INTEGER NOT NULL,
    "total_orders_accepted" INTEGER NOT NULL,
    "total_rating" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CaptainStatistic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "customer_longitude" DOUBLE PRECISION NOT NULL,
    "customer_latitude" DOUBLE PRECISION NOT NULL,
    "captain_id" INTEGER,
    "delivered_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Captain_email_key" ON "Captain"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Captain_phone_number_key" ON "Captain"("phone_number");

-- AddForeignKey
ALTER TABLE "CaptainAttributes" ADD CONSTRAINT "CaptainAttributes_captain_id_fkey" FOREIGN KEY ("captain_id") REFERENCES "Captain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaptainStatistic" ADD CONSTRAINT "CaptainStatistic_captain_id_fkey" FOREIGN KEY ("captain_id") REFERENCES "Captain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_captain_id_fkey" FOREIGN KEY ("captain_id") REFERENCES "Captain"("id") ON DELETE SET NULL ON UPDATE CASCADE;
