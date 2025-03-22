<template>
  <button
    :class="[
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:pointer-events-none',
      sizeClasses,
      variantClasses,
      iconOnlyClasses,
      {
        'cursor-not-allowed opacity-70': disabled || loading,
        'gap-2': $slots.icon && !iconOnly,
      },
    ]"
    :disabled="disabled || loading"
    :type="type"
    @click="handleClick"
  >
    <component
      v-if="loading"
      :is="loadingIcon"
      class="h-4 w-4 animate-spin"
      :class="{ 'mr-2': !iconOnly && $slots.default }"
      :size="18"
    />
    <component
      v-else-if="$slots.icon"
      :is="$slots.icon"
      :size="iconSize"
      :class="{ 'mr-2': !iconOnly && $slots.default }"
    />
    <slot v-if="!iconOnly || loading" />
  </button>
</template>

<script setup>
import { computed } from "vue";
import { Loader2 } from "lucide-vue-next";

const props = defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (value) =>
      [
        "primary",
        "secondary",
        "outline",
        "ghost",
        "link",
        "danger",
        "success",
        "warning",
      ].includes(value),
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg", "xl"].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loadingIcon: {
    type: Object,
    default: () => Loader2,
  },
  type: {
    type: String,
    default: "button",
  },
  iconOnly: {
    type: Boolean,
    default: false,
  },
  iconSize: {
    type: Number,
    default: 18,
  },
  horizontalPadding: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["click"]);

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit("click", event);
  }
};

const sizeClasses = computed(() => {
  const baseHeight = {
    sm: "h-8 text-xs",
    md: "h-10 py-2",
    lg: "h-12 py-2 text-base",
    xl: "h-14 py-3 text-lg",
  };

  const defaultPadding = {
    sm: "px-3",
    md: "px-4",
    lg: "px-6",
    xl: "px-8",
  };

  let classes = baseHeight[props.size];

  if (props.horizontalPadding) {
    classes += ` ${props.horizontalPadding}`;
  } else {
    classes += ` ${defaultPadding[props.size]}`;
  }

  return classes;
});

const iconOnlyClasses = computed(() => {
  if (!props.iconOnly) return "";

  const sizes = {
    sm: "h-8 w-8 p-0",
    md: "h-10 w-10 p-0",
    lg: "h-12 w-12 p-0",
    xl: "h-14 w-14 p-0",
  };

  return sizes[props.size];
});

const variantClasses = computed(() => {
  const variants = {
    primary: `
        bg-primary text-primary-foreground hover:bg-primary/90
        dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90
        focus-visible:ring-primary
      `,
    secondary: `
        bg-secondary text-secondary-foreground hover:bg-secondary/80
        dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/80
        focus-visible:ring-secondary
      `,
    outline: `
        border border-input bg-background hover:bg-accent hover:text-accent-foreground
        dark:border-input dark:bg-background dark:hover:bg-accent dark:hover:text-accent-foreground
        focus-visible:ring-accent
      `,
    ghost: `
        hover:bg-accent hover:text-accent-foreground
        dark:hover:bg-accent dark:hover:text-accent-foreground
        focus-visible:ring-accent
      `,
    link: `
        text-primary underline-offset-4 hover:underline
        dark:text-primary
        focus-visible:ring-primary
      `,
    danger: `
        bg-red-500 text-white hover:bg-red-600
        dark:bg-red-600 dark:hover:bg-red-700
        focus-visible:ring-red-500
      `,
    success: `
        bg-green-500 text-white hover:bg-green-600
        dark:bg-green-600 dark:hover:bg-green-700
        focus-visible:ring-green-500
      `,
    warning: `
        bg-yellow-500 text-white hover:bg-yellow-600
        dark:bg-yellow-600 dark:hover:bg-yellow-700
        focus-visible:ring-yellow-500
      `,
  };

  return variants[props.variant];
});
</script>
