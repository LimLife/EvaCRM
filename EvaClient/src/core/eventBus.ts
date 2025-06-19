type EventPayloads = {
    forceSelect: string;
    userLogin: { id: string; name: string };
};

type EventKey = keyof EventPayloads;
type TypedEventHandler<K extends EventKey> = (payload: EventPayloads[K]) => void;

interface Subscription
{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handler: (payload: any) => void;
    scope?: string;
    once?: boolean;
}

const eventMap: Map<EventKey, Subscription[]> = new Map();

export const eventBus = {
    on<K extends EventKey>(event: K, handler: TypedEventHandler<K>, scope?: string)
    {
        const subscriptions = eventMap.get(event) || [];
        subscriptions.push({ handler, scope });
        eventMap.set(event, subscriptions);
    },

    once<K extends EventKey>(event: K, handler: TypedEventHandler<K>, scope?: string)
    {
        const subscriptions = eventMap.get(event) || [];
        subscriptions.push({ handler, scope, once: true });
        eventMap.set(event, subscriptions);
    },

    emit<K extends EventKey>(event: K, payload: EventPayloads[K])
    {
        const subscriptions = eventMap.get(event);
        if (!subscriptions) return;

        const remaining: Subscription[] = [];

        for (const sub of subscriptions)
        {
            (sub.handler as TypedEventHandler<K>)(payload);
            if (!sub.once) remaining.push(sub);
        }

        if (remaining.length > 0)
        {
            eventMap.set(event, remaining);
        } else
        {
            eventMap.delete(event);
        }
    },

    off<K extends EventKey>(event: K, handler?: TypedEventHandler<K>, scope?: string)
    {
        const subscriptions = eventMap.get(event);
        if (!subscriptions) return;

        const filtered = subscriptions.filter(sub =>
        {
            const matchHandler = handler ? sub.handler !== handler : true;
            const matchScope = scope ? sub.scope !== scope : true;
            return matchHandler && matchScope;
        });

        if (filtered.length > 0)
        {
            eventMap.set(event, filtered);
        } else
        {
            eventMap.delete(event);
        }
    },

    clearScope(scope: string)
    {
        for (const [event, subs] of eventMap.entries())
        {
            const filtered = subs.filter(sub => sub.scope !== scope);
            if (filtered.length > 0)
            {
                eventMap.set(event, filtered);
            } else
            {
                eventMap.delete(event);
            }
        }
    }
};
