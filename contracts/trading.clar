;; Trading Contract

(define-map orders
  { order-id: uint }
  {
    seller: principal,
    rec-id: uint,
    price: uint,
    status: (string-ascii 20)
  }
)

(define-data-var next-order-id uint u0)

(define-public (create-sell-order (rec-id uint) (price uint))
  (let
    ((order-id (+ (var-get next-order-id) u1)))
    (var-set next-order-id order-id)
    (ok (map-set orders
      { order-id: order-id }
      {
        seller: tx-sender,
        rec-id: rec-id,
        price: price,
        status: "active"
      }
    ))
  )
)

(define-public (buy-rec (order-id uint))
  (let
    ((order (unwrap! (map-get? orders { order-id: order-id }) (err u404))))
    (asserts! (is-eq (get status order) "active") (err u403))
    ;; In a real implementation, we would transfer funds here
    (map-set orders
      { order-id: order-id }
      (merge order { status: "completed" })
    )
    ;; In a real implementation, we would transfer the REC ownership here
    (ok true)
  )
)

(define-read-only (get-order (order-id uint))
  (map-get? orders { order-id: order-id })
)

