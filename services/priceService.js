import { findCpusByNameExact } from "./cpuService.js";

/**
 * Calculates multithread performance per euro for each CPU result.
 * @param {string} name - Name to search for (exact or close match).
 * @param {number} euro - Euro amount to divide the performance by.
 * @returns {Array} CPUs with added valueScore field.
 */
export function findPerformancePerEuro(name, euro) {
  const cpus = findCpusByNameExact(name);

  if (!cpus.length) return [];

  return cpus.map(cpu => ({
    ...cpu,
    valueScore: parseFloat((cpu.multithread / euro).toFixed(2)),
  }));
}