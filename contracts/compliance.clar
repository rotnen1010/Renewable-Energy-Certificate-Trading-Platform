;; Compliance Contract

(define-map mandates
  { entity: principal }
  {
    required-amount: uint,
    current-amount: uint
  }
)

(define-public (set-mandate (entity principal) (required-amount uint))
  (ok (map-set mandates
    { entity: entity }
    {
      required-amount: required-amount,
      current-amount: u0
    }
  ))
)

(define-public (update-compliance (entity principal) (amount uint))
  (let
    ((mandate (unwrap! (map-get? mandates { entity: entity }) (err u404))))
    (ok (map-set mandates
      { entity: entity }
      (merge mandate { current-amount: (+ (get current-amount mandate) amount) })
    ))
  )
)

(define-read-only (check-compliance (entity principal))
  (let
    ((mandate (unwrap! (map-get? mandates { entity: entity }) (err u404))))
    (ok (>= (get current-amount mandate) (get required-amount mandate)))
  )
)

