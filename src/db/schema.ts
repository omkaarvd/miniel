import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';
import { pgTableCreator, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const createTable = pgTableCreator((name) => `miniel_${name}`);

export const uri = createTable('uri', {
  id: serial('id').unique().notNull().primaryKey(),
  shortUrlId: text('short_url_id').unique().notNull(),
  mainUrl: text('main_url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const uriRelations = relations(uri, ({ many }) => ({
  miniel_analytics: many(analytics),
}));

export const analytics = createTable('analytics', {
  id: serial('id').unique().notNull().primaryKey(),
  uriId: text('uri_id')
    .references(() => uri.shortUrlId, { onDelete: 'cascade' })
    .notNull(),
  visitedAt: timestamp('visited_at').defaultNow().notNull(),
});

export const analyticsRelations = relations(analytics, ({ one }) => ({
  miniel_uri: one(uri, {
    fields: [analytics.uriId],
    references: [uri.shortUrlId],
  }),
}));

export type InsertURI = typeof uri.$inferInsert;
export type SelectURI = InferSelectModel<typeof uri>;

export type InsertAnalytics = InferInsertModel<typeof analytics>;
export type SelectAnalytics = typeof analytics.$inferSelect;
