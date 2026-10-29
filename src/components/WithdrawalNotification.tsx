import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDownToLine, X } from 'lucide-react';

const demoFirstNames = [
    'Avery', 'Jordan', 'Maya', 'Noah', 'Riley', 'Morgan', 'Cameron', 'Quinn', 'Harper', 'Elliot',
    'Sofia', 'Lucas', 'Amara', 'Ethan', 'Nina', 'Kai', 'Leah', 'Mateo', 'Zoe', 'Isaac',
    'Priya', 'Owen', 'Layla', 'Caleb', 'Mila', 'Julian', 'Aria', 'Theo', 'Elena', 'Miles',
    'Naomi', 'Adrian', 'Freya', 'Ezra', 'Iris', 'Jasper', 'Aisha', 'Felix', 'Clara', 'Leo',
    'Talia', 'Rowan', 'Elise', 'Micah', 'Anika', 'Silas', 'Lena', 'Rafael', 'June', 'Samir',
];

const demoLastNames = [
    'Chen', 'Ellis', 'Brooks', 'Patel', 'Rivera', 'Morgan', 'Bennett', 'Reed', 'Foster', 'Hayes',
    'Kim', 'Turner', 'Singh', 'Carter', 'Price', 'Nguyen', 'Ward', 'Collins', 'Murphy', 'Parker',
    'Shah', 'Cooper', 'Bailey', 'Ross', 'Diaz', 'Bell', 'Wright', 'Evans', 'Flores', 'Baker',
    'Ali', 'Gray', 'James', 'Hughes', 'Lopez', 'Young', 'Scott', 'Adams', 'Green', 'Nelson',
    'Khan', 'Clark', 'Lewis', 'Walker', 'Roberts', 'Hall', 'Allen', 'King', 'Wong', 'Davis',
];

const demoWithdrawalNameIndexKey = 'broker-demo-withdrawal-name-index';
const demoWithdrawalAmountKey = 'broker-demo-withdrawal-amount-cents';
const minimumDemoAmountCents = 25000;
const demoAmountRangeCents = 2475000;

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const WithdrawalNotification = () => {
    const [notification, setNotification] = useState<{
        id: number;
        name: string;
        amount: number;
        occurredAt: Date;
    } | null>(null);
    const hasShownInitialNotification = useRef(false);

    useEffect(() => {
        let notificationId = 0;
        let hasStarted = false;
        let recurrenceTimer: ReturnType<typeof setTimeout> | undefined;
        let dismissalTimer: ReturnType<typeof setTimeout> | undefined;
        let isDisposed = false;

        const clearRecurrenceTimer = () => {
            if (recurrenceTimer) {
                clearTimeout(recurrenceTimer);
                recurrenceTimer = undefined;
            }
        };

        const showNotification = () => {
            const nameCount = demoFirstNames.length * demoLastNames.length;
            const storedNameIndex = localStorage.getItem(demoWithdrawalNameIndexKey);
            const lastNameIndex = storedNameIndex === null ? -1 : Number(storedNameIndex);
            const hasLastNameIndex = Number.isInteger(lastNameIndex) && lastNameIndex >= 0 && lastNameIndex < nameCount;
            const nameIndex = hasLastNameIndex
                ? (lastNameIndex + 1 + Math.floor(Math.random() * (nameCount - 1))) % nameCount
                : Math.floor(Math.random() * nameCount);

            const storedAmount = localStorage.getItem(demoWithdrawalAmountKey);
            const lastAmountCents = storedAmount === null ? -1 : Number(storedAmount);
            let amountCents = minimumDemoAmountCents + Math.floor(Math.random() * demoAmountRangeCents);
            if (amountCents === lastAmountCents) {
                amountCents = minimumDemoAmountCents + ((amountCents - minimumDemoAmountCents + 1) % demoAmountRangeCents);
            }

            const withdrawal = {
                name: `${demoFirstNames[nameIndex % demoFirstNames.length]} ${demoLastNames[Math.floor(nameIndex / demoFirstNames.length)]}`,
                amount: amountCents / 100,
            };
            const id = ++notificationId;
            localStorage.setItem(demoWithdrawalNameIndexKey, String(nameIndex));
            localStorage.setItem(demoWithdrawalAmountKey, String(amountCents));

            setNotification({ ...withdrawal, id, occurredAt: new Date() });
            if (dismissalTimer) clearTimeout(dismissalTimer);
            dismissalTimer = setTimeout(() => {
                setNotification((current) => current?.id === id ? null : current);
            }, 6000);
        };

        const scheduleNextNotification = () => {
            clearRecurrenceTimer();
            if (isDisposed || document.visibilityState === 'hidden') return;

            recurrenceTimer = setTimeout(() => {
                showNotification();
                scheduleNextNotification();
            }, 10000);
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                clearRecurrenceTimer();
                return;
            }

            if (!hasStarted && !hasShownInitialNotification.current) {
                hasStarted = true;
                hasShownInitialNotification.current = true;
                showNotification();
            }
            scheduleNextNotification();
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        if (document.visibilityState !== 'hidden') handleVisibilityChange();

        return () => {
            isDisposed = true;
            clearRecurrenceTimer();
            if (dismissalTimer) clearTimeout(dismissalTimer);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return (
        <div className="fixed right-4 top-4 z-[60] w-[calc(100%-2rem)] max-w-sm sm:right-6 sm:top-6" aria-live="polite">
            <AnimatePresence>
                {notification && (
                    <motion.section
                        key={notification.id}
                        role="status"
                        initial={{ opacity: 0, x: -24, y: 12 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, x: -16, y: 8 }}
                        transition={{ duration: 0.24, ease: 'easeOut' }}
                        className="overflow-hidden rounded-xl border border-border bg-secondary/95 text-text shadow-2xl shadow-black/40 backdrop-blur-xl"
                    >
                        <div className="flex items-start gap-3 p-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                                <ArrowDownToLine className="h-5 w-5" aria-hidden="true" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-2">
                                    <h2 className="text-sm font-bold">Withdrawal Notification</h2>
                                    <button
                                        type="button"
                                        onClick={() => setNotification(null)}
                                        aria-label="Dismiss withdrawal notification"
                                        className="-mr-1 -mt-1 rounded-md p-1 text-text-muted transition-colors hover:bg-white/10 hover:text-white"
                                    >
                                        <X className="h-4 w-4" aria-hidden="true" />
                                    </button>
                                </div>
                                <p className="mt-1 break-words text-sm text-text-muted">
                                    {notification.name} successfully withdrew{' '}
                                    <span className="font-semibold text-text">{currencyFormatter.format(notification.amount)}</span>
                                </p>
                                
                            </div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WithdrawalNotification;