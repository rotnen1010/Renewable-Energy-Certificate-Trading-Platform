;; REC Issuance Contract

(define-data-var next-rec-id uint u0)

(define-map recs
  { rec-id: uint }
  {
    owner: principal,
    energy-amount: uint,
    issuance-date: uint,
    status: (string-ascii 20)
  }
)

(define-public (issue-rec (energy-amount uint))
  (let
    ((rec-id (+ (var-get next-rec-id) u1)))
    (var-set next-rec-id rec-id)
    (ok (map-set recs
      { rec-id: rec-id }
      {
        owner: tx-sender,
        energy-amount: energy-amount,
        issuance-date: block-height,
        status: "active"
      }
    ))
  )
)

(define-read-only (get-rec (rec-id uint))
  (map-get? recs { rec-id: rec-id })
)

