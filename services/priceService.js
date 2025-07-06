import { findCpusByNameExact, findCpusByName } from "./cpuService.js";
import { findGpusByName, findGpusByNameExact } from "./gpuService.js";

/**
 * Calculates multithread performance per euro for each CPU result.
 * @param {string} name - Name to search for (exact or close match).
 * @param {number} euro - Euro amount to divide the performance by.
 * @returns {Array} CPUs with added valueScore and euro field.
 */
export function findCpuPerformancePerEuro(name, euro) {
  const cpus = findCpusByName(name);
  if (!cpus.length) return [];

  return cpus.map(cpu => ({
    ...cpu,
    euro,
    valueScore: parseFloat((cpu.multithread / euro).toFixed(2)),
  }));
}

export function findCpuPerformancePerEuroExact(name, euro) {
  const cpus = findCpusByNameExact(name);
  if (!cpus.length) return [];

  return cpus.map(cpu => ({
    ...cpu,
    euro,
    valueScore: parseFloat((cpu.multithread / euro).toFixed(2)),
  }));
}

/**
 * Calculates benchmark performance per euro for each GPU result.
 * @param {string} name - Name to search for (exact or close match).
 * @param {number} euro - Euro amount to divide the performance by.
 * @returns {Array} GPUs with added valueScore and euro field.
 */
export function findGpuPerformancePerEuro(name, euro) {
  const gpus = findGpusByName(name);
  if (!gpus.length) return [];

  return gpus.map(gpu => ({
    ...gpu,
    euro,
    valueScore: parseFloat((gpu.benchmark / euro).toFixed(2)),
  }));
}

export function findGpuPerformancePerEuroExact(name, euro) {
  const gpus = findGpusByNameExact(name);
  if (!gpus.length) return [];

  return gpus.map(gpu => ({
    ...gpu,
    euro,
    valueScore: parseFloat((gpu.benchmark / euro).toFixed(2)),
  }));
}
