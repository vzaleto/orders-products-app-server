-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" INTEGER NOT NULL,
    "serialNumber" INTEGER NOT NULL,
    "isNew" BOOLEAN NOT NULL,
    "photo" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "specification" TEXT NOT NULL,
    "guaranteeStart" DATETIME NOT NULL,
    "guaranteeEnd" DATETIME NOT NULL,
    "priceUsd" REAL NOT NULL,
    "priceUah" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "Product_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
