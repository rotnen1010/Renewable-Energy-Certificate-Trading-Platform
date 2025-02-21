import { describe, it, beforeEach, expect } from "vitest"

describe("Compliance Contract", () => {
  let mockStorage: Map<string, any>
  
  beforeEach(() => {
    mockStorage = new Map()
  })
  
  const mockContractCall = (method: string, args: any[], sender: string) => {
    switch (method) {
      case "set-mandate":
        const [entity, requiredAmount] = args
        mockStorage.set(`mandate-${entity}`, {
          required_amount: requiredAmount,
          current_amount: 0,
        })
        return { success: true }
      
      case "update-compliance":
        const [updateEntity, amount] = args
        const mandate = mockStorage.get(`mandate-${updateEntity}`)
        if (!mandate) return { success: false, error: 404 }
        mandate.current_amount += amount
        mockStorage.set(`mandate-${updateEntity}`, mandate)
        return { success: true }
      
      case "check-compliance":
        const [checkEntity] = args
        const checkMandate = mockStorage.get(`mandate-${checkEntity}`)
        if (!checkMandate) return { success: false, error: 404 }
        return {
          success: true,
          value: checkMandate.current_amount >= checkMandate.required_amount,
        }
      
      default:
        return { success: false, error: "Unknown method" }
    }
  }
  
  it("should set a mandate", () => {
    const result = mockContractCall("set-mandate", ["entity1", 1000], "admin")
    expect(result.success).toBe(true)
  })
  
  it("should update compliance", () => {
    mockContractCall("set-mandate", ["entity1", 1000], "admin")
    const result = mockContractCall("update-compliance", ["entity1", 500], "anyone")
    expect(result.success).toBe(true)
  })
  
  it("should check compliance", () => {
    mockContractCall("set-mandate", ["entity1", 1000], "admin")
    mockContractCall("update-compliance", ["entity1", 1200], "anyone")
    const result = mockContractCall("check-compliance", ["entity1"], "anyone")
    expect(result.success).toBe(true)
    expect(result.value).toBe(true)
  })
  
  it("should return false for non-compliant entity", () => {
    mockContractCall("set-mandate", ["entity1", 1000], "admin")
    mockContractCall("update-compliance", ["entity1", 800], "anyone")
    const result = mockContractCall("check-compliance", ["entity1"], "anyone")
    expect(result.success).toBe(true)
    expect(result.value).toBe(false)
  })
})

