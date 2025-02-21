import { describe, it, beforeEach, expect } from "vitest"

describe("Trading Contract", () => {
  let mockStorage: Map<string, any>
  let nextOrderId: number
  
  beforeEach(() => {
    mockStorage = new Map()
    nextOrderId = 0
  })
  
  const mockContractCall = (method: string, args: any[], sender: string) => {
    switch (method) {
      case "create-sell-order":
        const [recId, price] = args
        nextOrderId++
        mockStorage.set(`order-${nextOrderId}`, {
          seller: sender,
          rec_id: recId,
          price: price,
          status: "active",
        })
        return { success: true, value: nextOrderId }
      
      case "buy-rec":
        const [orderId] = args
        const order = mockStorage.get(`order-${orderId}`)
        if (!order) return { success: false, error: 404 }
        if (order.status !== "active") return { success: false, error: 403 }
        order.status = "completed"
        mockStorage.set(`order-${orderId}`, order)
        return { success: true }
      
      case "get-order":
        return { success: true, value: mockStorage.get(`order-${args[0]}`) }
      
      default:
        return { success: false, error: "Unknown method" }
    }
  }
  
  it("should create a sell order", () => {
    const result = mockContractCall("create-sell-order", [1, 1000], "user1")
    expect(result.success).toBe(true)
    expect(result.value).toBe(1)
  })
  
  it("should buy a REC", () => {
    mockContractCall("create-sell-order", [1, 1000], "user1")
    const result = mockContractCall("buy-rec", [1], "user2")
    expect(result.success).toBe(true)
  })
  
  it("should not buy an inactive order", () => {
    mockContractCall("create-sell-order", [1, 1000], "user1")
    mockContractCall("buy-rec", [1], "user2")
    const result = mockContractCall("buy-rec", [1], "user3")
    expect(result.success).toBe(false)
    expect(result.error).toBe(403)
  })
  
  it("should get order information", () => {
    mockContractCall("create-sell-order", [1, 1000], "user1")
    const result = mockContractCall("get-order", [1], "anyone")
    expect(result.success).toBe(true)
    expect(result.value).toEqual({
      seller: "user1",
      rec_id: 1,
      price: 1000,
      status: "active",
    })
  })
})

