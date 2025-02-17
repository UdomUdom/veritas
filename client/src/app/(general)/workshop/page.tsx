"use client";
import { ActionCard } from "@/components/Card";
import CardList from "@/mock/workshop.json";

export default function Workshop() {
  const list = CardList;

  return (
    <section className="container">
      <div className="p-8 md:p-12">
        <h1 className="font-semibold text-xl">WORKSHOP</h1>
        <div className="py-8">
          <ActionCard list={list} />
        </div>
      </div>
    </section>
  );
}
