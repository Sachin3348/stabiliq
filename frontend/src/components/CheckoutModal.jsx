import React, { useState } from 'react';
import { Button } from './ui/button';
import { Check, Tag, X, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { validateCoupon } from '../apis/service';
import { useAuth } from '@/context/AuthContext';

const CheckoutModal = ({ plan, onConfirm, onClose, loading }) => {
  const { token } = useAuth();
  const [couponCode, setCouponCode] = useState('');
  const [couponState, setCouponState] = useState(null); // null | 'validating' | { valid, discountAmount, finalAmount, reason }
  const [couponError, setCouponError] = useState('');

  // amounts in rupees
  const basePrice = plan.price;
  const gstAmount = plan.gst;
  const totalAmount = plan.totalPrice;

  const discountedBase = couponState?.valid && couponState.discountAmount != null
    ? basePrice - couponState.discountAmount
    : basePrice;
  const recalculatedGst = discountedBase * 0.18;
  const finalPayable = couponState?.valid ? discountedBase + recalculatedGst : totalAmount;

  const handleValidateCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponState('validating');
    setCouponError('');
    try {
      const res = await validateCoupon(couponCode.trim(), plan.id, token);
      const data = res.data;
      if (data.valid) {
        setCouponState(data);
      } else {
        setCouponState(data);
        setCouponError(data.reason || 'Coupon is not valid.');
      }
    } catch {
      setCouponState(null);
      setCouponError('Failed to validate coupon. Please try again.');
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode('');
    setCouponState(null);
    setCouponError('');
  };

  const Icon = plan.icon;
  const couponApplied = couponState && couponState !== 'validating' && couponState.valid;
  const couponInvalid = couponState && couponState !== 'validating' && !couponState.valid;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>
            Order Summary
          </h2>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-40"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Plan info */}
          <div className="flex items-center gap-3">
            <div className={`bg-gradient-to-br ${plan.gradient} p-2.5 rounded-xl inline-flex shadow-md`}>
              <Icon className="h-6 w-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-base">{plan.name} Plan</p>
              <p className="text-slate-500 text-sm">{plan.subtitle}</p>
            </div>
          </div>

          {/* Price breakdown */}
          <div className="bg-slate-50 rounded-xl p-4 space-y-2.5 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Base price (1 year)</span>
              <span>₹{basePrice.toLocaleString('en-IN')}</span>
            </div>
            {couponApplied && (
              <div className="flex justify-between text-green-600 font-medium">
                <span>Coupon discount</span>
                <span>- ₹{couponState.discountAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
            )}
            {couponApplied && (
              <div className="flex justify-between text-slate-500 text-xs">
                <span>Discounted base</span>
                <span>₹{discountedBase.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>GST (18%)</span>
              <span>₹{(couponApplied ? recalculatedGst : gstAmount).toFixed(2)}</span>
            </div>
            <div className="border-t border-slate-200 pt-2.5 flex justify-between font-bold text-slate-900 text-base">
              <span>Total payable</span>
              <span>₹{finalPayable.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          {/* Coupon input */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              <Tag className="h-3.5 w-3.5 inline mr-1.5" />
              Have a coupon?
            </label>
            {couponApplied ? (
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span className="text-green-700 text-sm font-medium flex-1">
                  "{couponCode}" applied!
                </span>
                <button
                  onClick={handleRemoveCoupon}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value.toUpperCase());
                    if (couponInvalid) { setCouponState(null); setCouponError(''); }
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleValidateCoupon()}
                  placeholder="Enter coupon code"
                  className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase placeholder:normal-case"
                  disabled={couponState === 'validating'}
                />
                <Button
                  onClick={handleValidateCoupon}
                  disabled={!couponCode.trim() || couponState === 'validating'}
                  size="sm"
                  className="bg-slate-900 hover:bg-slate-700 text-white rounded-xl px-4 font-semibold"
                >
                  {couponState === 'validating' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Apply'
                  )}
                </Button>
              </div>
            )}
            {couponError && (
              <div className="flex items-center gap-1.5 mt-2 text-red-600 text-sm">
                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{couponError}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <Button
            size="lg"
            className={`w-full bg-gradient-to-r ${plan.gradient} hover:opacity-90 text-white font-bold py-6 rounded-xl shadow-lg transition-all hover:scale-[1.02]`}
            onClick={() => onConfirm(couponApplied ? couponCode : null)}
            disabled={loading || couponState === 'validating'}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Processing...
              </span>
            ) : (
              `Pay ₹${finalPayable.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
            )}
          </Button>
          <p className="text-center text-xs text-slate-400 mt-3">
            Secured payment
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
