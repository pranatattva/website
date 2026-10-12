"use client";

let loading;
function loadScript() {
  if (typeof window === "undefined") return Promise.reject(new Error("No window"));
  if (window.Razorpay) return Promise.resolve();
  if (!loading) {
    loading = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload = resolve;
      s.onerror = () => {
        loading = null;
        reject(new Error("Couldn't load the payment window. Check your connection and try again."));
      };
      document.body.appendChild(s);
    });
  }
  return loading;
}

// Creates an order on our server, opens Razorpay, then verifies the payment.
export async function payWithRazorpay(payload, { description }) {
  const res = await fetch("/api/checkout/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const order = await res.json();
  if (!res.ok) throw new Error(order.error || "Couldn't start the payment.");

  await loadScript();

  return new Promise((resolve, reject) => {
    let lastError = "";
    const rzp = new window.Razorpay({
      key: order.keyId,
      amount: order.amount,
      currency: order.currency,
      order_id: order.orderId,
      name: "Pranatattva",
      description,
      prefill: order.prefill,
      theme: { color: "#5E3C99" },
      handler: async (resp) => {
        try {
          const v = await fetch("/api/checkout/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(resp),
          });
          const data = await v.json();
          if (!v.ok) throw new Error(data.error || "Payment received but verification failed. We'll contact you.");
          resolve(data);
        } catch (e) {
          reject(e);
        }
      },
      modal: {
        ondismiss: () =>
          reject(new Error(lastError ? `${lastError} You haven't been charged.` : "Payment was cancelled. You haven't been charged.")),
      },
    });
    // Razorpay lets the customer retry inside the window, so just remember the reason.
    rzp.on("payment.failed", (r) => { lastError = r?.error?.description || "The payment didn't go through."; });
    rzp.open();
  });
}
