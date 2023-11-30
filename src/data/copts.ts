/**
 *  copts.rs
 * 
 *  pub name: String,
 *  pub opt_type: String,
 *  pub values: Vec<String>,
 *  pub range_min: f32,
 *  pub range_max: f32
 */
export class ControlOptions {
    name!: string;
    opt_type!: string;
    values!: string[];
    range_min!: number;
    range_max!: number;
}