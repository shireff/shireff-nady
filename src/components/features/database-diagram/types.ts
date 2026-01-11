export interface Column {
  name: string;
  type: string;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
  references?: { table: string; column: string };
  isUnique?: boolean;
  isNullable?: boolean;
}

export interface Table {
  name: string;
  columns: Column[];
}

export interface Relationship {
  fromTable: string;
  fromColumn: string;
  toTable: string;
  toColumn: string;
  type: string;
}

export interface SchemaData {
  type: string;
  tables: Table[];
  relationships: Relationship[];
}

export interface PositionedTable extends Table {
  x: number;
  y: number;
}
